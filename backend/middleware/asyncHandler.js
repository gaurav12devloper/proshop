/* const asynHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}; */

const asyncHandler = function (fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next); // fn is the function that we pass in 
    }
}
export default asyncHandler;
