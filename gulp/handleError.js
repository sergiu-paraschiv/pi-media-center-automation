/* eslint no-console: 0 */

export default function handleError(e) {
    console.error(e.message);
    this.emit('end');
}
