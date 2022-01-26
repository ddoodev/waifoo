export class DepartmentError extends Error {
  constructor(public department: string, message: string) {
    super(message)
    this.message = message
    this.name = this.constructor.name
  }
}