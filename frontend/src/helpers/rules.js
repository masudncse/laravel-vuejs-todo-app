export default {
    namespaced: true,
    state: {
        textRequiredRules: [
            v => !!v || 'Name is required'
        ]
    }
}