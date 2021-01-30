/* eslint-disable linebreak-style */
module.exports = class Init {
    static info (req, res) {
        
        const responseMessage = {
            "message": "My Rule-Validation API",
            "status": "success",
            "data": {
                "name": "Awe Olumide David",
                "github": "@aweolumidedavid",
                "email": "aweolumidedavid@gmail.com",
                "mobile": "09059577349",
                "twitter": "@Dee_Cheddah"
            }
        };
        return res.json(responseMessage);
    }


    static ruleValidation (req, res) {
        let receivedData;
        let data;
        let rule;
    
        try {
            receivedData = JSON.parse(JSON.stringify(req.body));
            data = JSON.parse(JSON.stringify(receivedData.data));
            rule = JSON.parse(JSON.stringify(receivedData.rule));
        } catch (err) {
            return res.status(400).json({
                "message": "Invalid JSON payload passed.",
                "status": "error",
                "data": null
            });
        }

        let keys = ['rule', 'data'];
        for (const key in receivedData) {
            if (!keys.includes(key)) {
                return res.status(400).json({
                    "message": "Illegal Data received.",
                    "status": "fail",
                    "data": {
                        isValidForRule: false,
                    }
                });
            }
        }

        keys = Object.keys(receivedData);

        if (!keys.includes('rule')) {
            return res.status(400).json({
                "message": "rule is required.",
                "status": "error",
                "data": null
            });
        }

        if (!keys.includes('data')) {
            return res.status(400).json({
                "message": "data is required.",
                "status": "error",
                "data": null
            }); 
        }

        if (typeof data !== 'object') {
            if (typeof data !== 'string') {
                return res.status(400).json({
                    "message": "data should be one of an array, object or string.",
                    "status": "error",
                    "data": null
                });
            }
        }
        if (typeof rule !== 'object') {
            return res.status(400).json({
                "message": 'rule should be an object.',
                "status": "error",
                "data": null
            });
        }
    
        const { field, condition, condition_value } = rule;
        
        if (!data[field]) {
            return res.status(400).json({
                "message": `field ${field} is missing from data.`,
                "status": "error",
                "data": null
            });
        }
    
        const value = {
            "message": "",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "",
                    "field_value": 0,
                    "condition": "",
                    "condition_value": 0
                }
            }
        };
        let status = 400;
        const fieldValue = data[field];
        if (condition == 'gt') {
            if (fieldValue > condition_value) {
                value.message = `field ${field} successfully validated.`;
                value.status = 'success';
                value.data.validation.error = false;
                status = 200;			
            } else {
                value.message = `field ${field} failed validation.`;
            }	
        } else if (condition == 'eq') {
            if (fieldValue == condition_value) {
                value.message = `field ${field} successfully validated.`;
                value.data.validation.error = false;
                value.status = 'success';
                status = 200;			
            } else {
                value.message = `field ${field} failed validation.`;
            }
        } else if (condition == 'neq') {
            if (fieldValue != condition_value) {
                value.message = `field ${field} successfully validated.`;
                value.data.validation.error = false;
                value.status = 'success';	
                status = 200;		
            } else {
                value.message = `field ${field} failed validation.`;
            }
        } else if (condition == 'gte') {
            if (fieldValue >= condition_value) {
                value.message = `field ${field} successfully validated.`;
                value.data.validation.error = false;	
                value.status = 'success';
                status = 200;		
            } else {
                value.message = `field ${field} failed validation.`;
            }
        } else if (condition == 'contains') {
            if (fieldValue.includes(condition_value)) {
                value.message = `field ${field} successfully validated.`;
                value.data.validation.error = false;
                value.status = 'success';	
                status = 200;		
            } else {
                value.message = `field ${field} failed validation.`;
        
            }
        }
    
        value.data.validation.field = field;
        value.data.validation.field_value = fieldValue;
        value.data.validation.condition = condition;
        value.data.validation.condition_value = condition_value;
    
        res.status(status).json(value);
    }
};