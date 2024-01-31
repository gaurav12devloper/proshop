const notFound = (req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`); //
    res.status(404); 
    next(error);
};

const errorHandler=(err, req, res, next)=>{
    const statusCode=res.statusCode===200 ? 500 : res.statusCode;
    let message=err.message;

    // check for mongoose bads object id error

    if(err.name==='castError' && err.kind==='ObjectId'){ // castError is the error name that mongoose throws when it cannot find the object id
        statusCode=404;
        message='Resource not found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV==='production' ? null : err.stack,
    });
};
export {notFound, errorHandler};