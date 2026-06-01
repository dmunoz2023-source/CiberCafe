export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly birthDate: Date,
    public balance: number = 0,
    public vipExpirationDate: Date | null = null,
    public autoRenewSubscription: boolean = false
  ) {}

  getBalance(): number {
    return this.balance;
  }

  canAccessEstablishment(currentTime: Date): boolean {
    const age = currentTime.getFullYear() - this.birthDate.getFullYear();
    const hour = currentTime.getHours();
    if (age < 15 && hour >= 20) {
      return false;
    }
    return true;
  }

  canUseServices(): boolean {
    return this.balance > 0;
  }

  deductBalance(amount: number): void {
    if (this.balance < amount) {
      throw new Error('Insufficient balance');
    }
    this.balance -= amount;
  }

  addBalance(amount: number): void {
    this.balance += amount;
  }

  hasActiveSubscription(currentTime: Date): boolean {
    return this.vipExpirationDate !== null && this.vipExpirationDate > currentTime;
  }

  activateVip(currentTime: Date): void {
    const expiration = new Date(currentTime);
    expiration.setDate(expiration.getDate() + 30);
    this.vipExpirationDate = expiration;
    this.autoRenewSubscription = true;
  }

  cancelVipSubscription(): void {
    this.vipExpirationDate = null;
    this.autoRenewSubscription = false;
  }
}
