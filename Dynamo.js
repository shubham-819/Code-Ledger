const aws = require('aws-sdk');
aws.config.update({
    region: "ap-south-1",
    accessKeyId: PROCESS.ENV.ID,
    secretAccessKey: PROCESS.ENV.KEY
});
const dynamoClient = new aws.DynamoDB.DocumentClient();
const TABLE_NAME = "chrome-ext";

const getRows = async (id) => {
    const params = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'userid = :userid',
            ExpressionAttributeValues: {
                ':userid': id
            },
            
    };
    const rows = await dynamoClient.query(params).promise();
    return rows;
};

const addOrUpdateRow = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character,
    };
    return await dynamoClient.put(params).promise();
};

const deleteRow = async (userid,typeid) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userid,
            typeid
        },
    };
    return await dynamoClient.delete(params).promise();
};

module.exports = {
    getRows,
    addOrUpdateRow,
    deleteRow
};
