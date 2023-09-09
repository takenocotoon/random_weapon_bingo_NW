export function getFileTimestamp():string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        year: '2-digit', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    const formattedDate = now.toLocaleDateString(undefined, options).replace(/[/:,\s]/g, '');
    return formattedDate;
}
