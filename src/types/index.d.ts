// /home/boltik/code/Degenlend-API/src/types/index.d.ts

// Define a User type
export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define a Loan type
export interface Loan {
    id: string;
    userId: string;
    amount: number;
    interestRate: number;
    startDate: Date;
    endDate: Date;
    status: 'pending' | 'approved' | 'rejected';
}

// Define a Payment type
export interface Payment {
    id: string;
    loanId: string;
    amount: number;
    paymentDate: Date;
}

// Define a Response type
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}