export function getShortName(firstName?: string, lastName?: string): string {
    return firstName?.charAt(0) ?? "" + lastName?.charAt(0) ?? ""
}