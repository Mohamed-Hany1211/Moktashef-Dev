// modules imports
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// files imports
import User from '../../../DB/models/user.model.js';
import sendEmailService from '../../services/Send-mail.service.js';
import generateUniqueString from '../../utils/generate-unique-string.js';
import cloudinaryConnection from '../../utils/cloudinary.js';
// ======================== signUp api 
/*
    1 - destructing the required data from the body
    2 - check if the user is already exist in DB
    3 - creating the userName
    4 - creating user's token for email confirmation
    5 - sending confirmation email to the user
    6 - hashing the password
    7 - creating user media folder id
    8 - create the user image object
    9 - check if the user uploaded an imgae
        9.1 - upload user image on cloudinary
        9.2 - add the folder in request object so that if any error occure while uploading the image it will not upload due to rollback 
    10 - creating new user object
    11 - saving the user in DB
    12 - rollback the saved document in case of any error after user creation
    13 - return the response
*/
export const signUp = async (req, res, next) => {
    // 1 - destructing the required data from the body
    const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
    } = req.body;
    // 2 - check if the user is already exist in DB
    const isUserExist = await User.findOne({
        $or: [
            { email },
            { phoneNumber }
        ]
    })
    if (isUserExist) return next(new Error('User already exist', { cause: 409 }));
    // 3 - creating the userName
    const userName = firstName + ' ' + lastName;
    // 4 - creating user's token for email confirmation
    const userToken = jwt.sign({ email }, process.env.JWT_SECRET_VEREFICATION, { expiresIn: '5m' });
    // 5 - sending confirmation email to the user
    const isEmailSent = await sendEmailService({
        to: email,
        subject: 'Email Verification',
        message: `<section style="width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;">
        <div style="width: 50%; background-color: rgba(128, 128, 128,0.3); height: 20vh; border-radius: .625rem; text-align: center;">
            <h2 style=" color: black; text-shadow: 7px 7px 5px  white;display:block;font-size:25px;">Please click the link to verify your account</h2>
            <a style="text-decoration: none; font-size: 20px; " href='http://localhost:3000/user/verify-email?token=${userToken}'>Verify Account</a>
        </div>
    </section>`
    });
    if (!isEmailSent) return next(new Error('Failed to send verification email', { cause: 500 }));
    // 6 - hashing the password
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
    // 7 - creating user media folder id
    const UserfolderId = generateUniqueString(13);
    // 8 - create the user image object
    let userImg = {
        secure_url: '',
        public_id: ''
    }
    // 9 - check if the user uploaded an imgae
    if (!req.file) {
        userImg = {
            secure_url: '',
            public_id: ''
        }
    } else {
        // 9.1 - upload user image on cloudinary
        const { secure_url, public_id } = await cloudinaryConnection().uploader.upload(req.file.path, {
            folder: `${process.env.MAIN_MEDIA_FOLDER}/USERS/${UserfolderId}/user_picture`
        })
        //  9.2 - add the folder in request object so that if any error occure while uploading the image it will not upload due to rollback 
        req.folder = `${process.env.MAIN_MEDIA_FOLDER}/USERS/${UserfolderId}/user_picture`;
        userImg = {
            secure_url,
            public_id
        }
    }
    // 10 - creating new user object
    const userData = {
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        phoneNumber,
        userImg,
        mediaFolderId:UserfolderId
    };
    // 11 - saving the user in DB
    const newUser = await User.create(userData);
    // 12 - rollback the saved document in case of any error after user creation
    req.savedDocument = { model: User, _id: newUser._id };
    if (!newUser) return next({ message: 'User Creation Faild', cause: 500 });
    // 13 - return the response
    res.status(201).json({
        success: true,
        message: 'User created successfully , please check your email to verify your account',
        data: newUser
    });
}

// ============================= verify the email ========================== //

/*
    1 - destructing the required data 
    2 - verify user's token 
    3 - get user by email with isEmailVerified = false
    4 - check if the user exist or not
    5 - return the response
*/
export const verifyEmail = async (req, res, next) => {
    // 1 - destructing the required data 
    const { token } = req.query;
    // 2 - verify user's token 
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_VEREFICATION);
    // 3 - get user by email with isEmailVerified = false
    const findUser = await User.findOneAndUpdate({ email: decodedData.email, isEmailVerified: false }, { isEmailVerified: true }, { new: true });
    // 4 - check if the user exist or not
    if (!findUser) {
        return next(new Error(`user not foud`, { cause: 404 }));
    }
    // 5 - return the response
    return res.status(200).json({
        success: true,
        message: 'email verified successfully',
        data: findUser
    });
}
