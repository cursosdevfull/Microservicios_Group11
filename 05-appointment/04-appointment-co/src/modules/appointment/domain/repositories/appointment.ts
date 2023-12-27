export interface AppointmentRepository {
  receive(consumer: (message: any) => void): Promise<void>;
  sendToQueueMessageConfirmed(id: string, state: string): Promise<void>;
}
