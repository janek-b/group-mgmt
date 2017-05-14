import { AttendingPipe } from './attending.pipe';

describe('AttendingPipe', () => {
  it('create an instance', () => {
    const pipe = new AttendingPipe();
    expect(pipe).toBeTruthy();
  });
});
