import Schedule from 'node-schedule';

class ScheduleService {
    start(task, seconds) {
        Schedule.scheduleJob(seconds + ' * * * * *', task);
    }
}

export default new ScheduleService();
