export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  department?: string;
}

export interface Equipment {
  id: string;
  type: 'computer' | 'laptop' | 'monitor' | 'printer' | 'phone' | 'other';
  description: string;
  quantity: number;
  assetTag?: string;
  location?: string;
  specialInstructions?: string;
}

export interface Furniture {
  id: string;
  type: 'desk' | 'chair' | 'table' | 'cabinet' | 'other';
  description: string;
  quantity: number;
  location?: string;
  condition?: 'good' | 'fair' | 'poor';
  disposition?: 'transfer' | 'surplus' | 'dispose';
}

export interface M365Account {
  id: string;
  email: string;
  userName: string;
  employeeName: string;
  dataBackupRequired: boolean;
  backupInstructions?: string;
}

export interface CloseoutDetails {
  programName: string;
  programType: string;
  closeoutDate: Date;
  lastOperationalDate: Date;
  
  primaryContact: ContactInfo;
  alternateContact?: ContactInfo;
  
  totalStaff: number;
  location: {
    building: string;
    floor?: string;
    roomNumbers?: string[];
    address: string;
  };
  
  equipment: Equipment[];
  furniture: Furniture[];
  m365Accounts: M365Account[];
  
  networkingRequirements: {
    wifiAccessPoints: number;
    networkPrinters: number;
    sharedDrives: string[];
    specialNetworkNeeds?: string;
  };
  
  physicalMoveRequirements: {
    packingRequired: boolean;
    labelingInstructions?: string;
    accessRestrictions?: string;
    elevatorRequired: boolean;
    specialHandling?: string;
  };
  
  timeline: {
    equipmentPickupDate?: Date;
    furniturePickupDate?: Date;
    finalVacateDate: Date;
    keyReturnDate?: Date;
  };
  
  additionalNotes?: string;
  specialRequirements?: string;
  
  createdAt: Date;
  updatedAt: Date;
}