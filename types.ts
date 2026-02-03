
export interface Order {
  id: string;
  dishName: string;
  quantity: number;
  price: number;
  timestamp: string;
  status: 'pending' | 'preparing' | 'served' | 'cancelled';
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  lastRestockDate: string;
}

export interface Table {
  id: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  occupiedTime?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  shift: string;
  efficiency: number; // 0-100
  tasksCompleted: number;
}

export interface Feedback {
  id: string;
  customerName: string;
  comment: string;
  rating: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
  analysis?: string;
}

export interface FinanceRecord {
  date: string;
  revenue: number;
  expense: number;
  profit: number;
}
