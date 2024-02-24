declare global {
    namespace Nodejs {
        interface ProcessEnv {
            HOST:string;
            NODE_ENV: 'development' | 'production';
            MONGO_URI:string;
            PORT:string;
        }
    }
}

export {}