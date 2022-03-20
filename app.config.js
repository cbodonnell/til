module.exports = ({ config }) => {
    const environment = process.env.ENV;
    if (environment === 'production') {
        return {
            /* your production config */
            ...config,
            extra: {
                environment,
                api: "https://til.studio10b.nyc/api",
                auth: "https://til.studio10b.nyc/auth"
            }
        };
    } else {
        return {
            /* your development config */
            ...config,
            extra: {
                environment,
                api: "http://localhost:8080",
                auth: "http://localhost:8082/auth"
            }
        };
    }
};