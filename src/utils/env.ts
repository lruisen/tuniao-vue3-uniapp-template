export const getEnvConfig = () => {
    const env = import.meta.env;

    return {
        ...env
    };
};