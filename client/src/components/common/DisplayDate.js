
const DisplayDate = props => {

    const calculateDate = created => {

        var milliSeconds = Date.parse(created);
        const since = milliSeconds;
        var elapsed = (new Date().getTime() - since) / 1000;
        const date = new Date(Math.floor(since));
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        let currentTime = new Date();
        const currentYear = currentTime.getFullYear();
        const day = date.getDate();

        if (elapsed >= 0) {
            const diff = {};

            diff.days = Math.floor(elapsed / 86400);
            diff.hours = Math.floor(elapsed / 3600 % 24);
            diff.minutes = Math.floor(elapsed / 60 % 60);
            diff.seconds = Math.floor(elapsed % 60);

            if (diff.days > 1 && year !== currentYear) {
                return month + " " + day + ", " + year;
            }
            else if (diff.days > 1 && year === currentYear) {
                return month + " " + day;
            }
            else if (diff.days === 1) {
                return "yesterday"
            }
            else if (diff.days < 1 && diff.hours >= 1) {
                return diff.hours + "h";
            }
            else if (diff.days < 1 && diff.hours < 1 && diff.minutes >= 1) {
                return diff.minutes + "m";
            }
            else {
                return "just now"
            }
        }
        else {
            return "just now";
        }
    }

    return (
        <div>{calculateDate(props.created)}</div>
    )
}

export default DisplayDate;
