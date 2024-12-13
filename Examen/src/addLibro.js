const {v4} = require('uuid');
const AWS = require('aws-sdk');;
exports.addLibro = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {title, author, publishedyear, genre} = JSON.parse(event.body);
    const msbb_examen_u1= v4();
    const newLibro = {
        msbb_examen_u1,
        title,
        author,
        publishedyear,
        genre
    };
    await dynamodb
        .put({
            TableName: 'BooksTable',
            Item: newLibro
        })
        .promise();
    return {
        statusCode: 200,
        body: JSON.stringify(newLibro),
    };
};


