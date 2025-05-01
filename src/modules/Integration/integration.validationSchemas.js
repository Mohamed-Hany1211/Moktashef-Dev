import Joi from "joi";

export const integrationSchema = {
    body:Joi.object({
        TargetUrl:Joi.string().pattern(new RegExp(/^(https?:\/\/)(?:[\w-]+\.)+[a-z]{2,}(?::\d+)?(?:\/[\w\-\.~!$&'()*+,;=:@%]*)*(?:\?[\w\-\.~!$&'()*+,;=:@%/?]*)?(?:#[\w\-\.~!$&'()*+,;=:@%/?]*)?$/)).required()
    })
}
