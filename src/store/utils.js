export default function checkForLongerPath(resource) {
    if (resource.includes('/')) {
        return resource.slice(0,
            resource.indexOf('/')
        )
    }
    return resource
}

