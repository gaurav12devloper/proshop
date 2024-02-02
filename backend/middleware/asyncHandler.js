const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/* const asyncHandler = function (fn) {
    return function (req, res, next) { // if there is any error, it will be passed to next and then error handler will be called
        Promise.resolve(fn(req, res, next)).catch(next); // fn is the function that we pass in as a parameter 
   
    }
} */
export default asyncHandler;
