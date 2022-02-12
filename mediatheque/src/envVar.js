const getEnvVars = (env) => {
    console.log(`RELEASE CHANNEL: ${env}`)
    switch (env) {
        case 'production': 
            return { apiUrl: 'https://mediatheque-react-node.herokuapp.com'}
        case 'development': 
            return { apiUrl: 'http://localhost:3001'}
        default:
            return 'noEnv'
    }
}

export default getEnvVars(process.env.NODE_ENV)