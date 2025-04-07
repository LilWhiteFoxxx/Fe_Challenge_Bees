export const formatBalance = (amount: number): string => {
    return `$${amount.toLocaleString('en-US')}`;
};

export const formatFullDateTime = (dateString: string | null): string => {
    if (!dateString) return 'No Date Provided';
    try {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    } catch (error) {
        console.error('Error formatting full date:', dateString, error);
        return 'Invalid Date';
    }
};

export const formatDateOnly = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    try {
        return dateString.substring(0, 10);
    } catch (error) {
        console.error('Error formatting date only:', dateString, error);
        return 'Invalid Date';
    }
};
