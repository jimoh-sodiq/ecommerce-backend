import { UnauthorizedError } from '../errors/index.js';

export function checkPermissions(requestUser, resourceUserId) {
    if(requestUser.role == 'admin') return
    if(requestUser.userId == resourceUserId.toString()) return
    throw new UnauthorizedError("Sorry, you are not authorized to access this resource");
}