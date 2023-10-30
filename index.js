const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'ba english' },
    { id: 2, name: 'bca' },
    { id: 3, name: 'bsc' }
];

// Create a Joi schema for validation
const schema = Joi.object({
    name: Joi.string().min(3).required()
});

// Create a new course
app.post('/api/courses', (req, res) => {
    const { error } = schema.validate(req.body);

    if (error) {
        // 400 Bad Request - send validation error message
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// ...

// const port = process.env.PORT || 7000;
// app.listen(7000, () => console.log(`Listening on port ${port}...`));





//Update an existing course
// app.put('/api/courses/:id', (req, res) => {
//     const courseId = parseInt(req.params.id);

//     // Find the course with the specified ID
//     const course = courses.find(c => c.id === courseId);

//     if (!course) {
//         // If the course with the given ID is not found, return a 404 Not Found response
//         return res.status(404).send('The course with the given ID was not found');
//     }

//     // Validate the request body using Joi, similar to the POST route
//     const result = Joi.validate(req.body, schema);

//     if (result.error) {
//         // If validation fails, return a 400 Bad Request response with the validation error message
//         return res.status(400).send(result.error.details[0].message);
//     }

//     // Update the course's name with the new name from the request body
//     course.name = req.body.name;

//     // Return the updated course
//     res.send(course);
// });


// const port = process.env.PORT || 3000;
// app.listen(3000, () => console.log(`Listening on port ${port}...`));


app.put('/api/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const updatedName = req.body.name;

    // Find the course with the specified ID
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        // If the course with the given ID is not found, return a 404 Not Found response
        return res.status(404).send('The course with the given ID was not found');
    }

    // Update the name of the course with the new name
    course.name = updatedName;

    // Return the updated course
    res.send(course);
});
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));

