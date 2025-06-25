export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  department?: string;
  availability?: string;
  preferredContact?: 'email' | 'phone' | 'both';
}

export interface ProgramDetails {
  programName: string;
  programType: string;
  description?: string;
  lastServiceDate: Date;
  closureDate: Date;
  staffCount: number;
  organizationalStructure?: string;
  complianceRequirements?: string[];
}

export interface LocationDetails {
  building: string;
  floor?: string;
  roomNumbers: string[];
  address: string;
  accessRestrictions?: string;
  securityRequirements?: string;
  keyReturnRequired: boolean;
  keyReturnDate?: Date;
}

export interface AssetItem {
  id: string;
  type: string;
  description: string;
  quantity: number;
  assetTag?: string;
  serialNumber?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'non-functional';
  location: string;
  disposition: 'transfer' | 'surplus' | 'dispose' | 'return' | 'storage';
  specialInstructions?: string;
  estimatedValue?: number;
}

export interface ITEquipment extends AssetItem {
  type: 'desktop' | 'laptop' | 'monitor' | 'printer' | 'phone' | 'network-device' | 'server' | 'other-it';
  networkConnected: boolean;
  dataWipeRequired: boolean;
  manufacturer?: string;
  model?: string;
}

export interface Furniture extends AssetItem {
  type: 'desk' | 'chair' | 'table' | 'cabinet' | 'shelving' | 'other-furniture';
  dimensions?: string;
  material?: string;
  disassemblyRequired: boolean;
}

export interface DigitalAsset {
  id: string;
  type: 'user-account' | 'shared-drive' | 'database' | 'application' | 'email-group' | 'other';
  name: string;
  description?: string;
  owner: string;
  backupRequired: boolean;
  retentionPeriod?: string;
  accessPermissions: string[];
  deactivationDate?: Date;
  archivalRequired: boolean;
  complianceNotes?: string;
}

export interface UserAccount extends DigitalAsset {
  type: 'user-account';
  email: string;
  employeeName: string;
  department: string;
  lastLoginDate?: Date;
  forwardingEmail?: string;
  mailboxSize?: number;
  sharedMailboxAccess?: string[];
}

export interface NetworkingRequirements {
  wifiAccessPoints: number;
  networkPrinters: number;
  sharedDrives: string[];
  networkDrops: number;
  phoneLines: number;
  internetCircuits: string[];
  vpnAccess: string[];
  specialNetworkNeeds?: string;
  firewallRules?: string[];
}

export interface LogisticsRequirements {
  packingRequired: boolean;
  labelingInstructions?: string;
  elevatorRequired: boolean;
  loadingDockAccess: boolean;
  truckAccessRequired: boolean;
  storageNeeded: boolean;
  specialHandling?: string;
  hazardousMaterials?: string;
  insuranceRequired: boolean;
  transportationNeeds?: string;
}

export interface Timeline {
  equipmentPickupDate?: Date;
  furniturePickupDate?: Date;
  digitalAssetDeactivationDate?: Date;
  finalVacateDate: Date;
  keyReturnDate?: Date;
  auditDate?: Date;
  documentationDueDate?: Date;
  coordinationMeetingDate?: Date;
}

export interface QualityChecks {
  informationComplete: boolean;
  contactsVerified: boolean;
  assetsInventoried: boolean;
  timelineConfirmed: boolean;
  stakeholdersNotified: boolean;
  complianceReviewed: boolean;
  risksAssessed: boolean;
}

export interface StakeholderCommunication {
  itOperationsNotified: boolean;
  adminOperationsNotified: boolean;
  securityNotified: boolean;
  facilitiesNotified: boolean;
  hrNotified: boolean;
  financeNotified: boolean;
  customStakeholders?: string[];
}

export interface ProgramClosureData {
  id: string;
  status: 'draft' | 'submitted' | 'in-progress' | 'completed' | 'cancelled';
  
  programDetails: ProgramDetails;
  primaryContact: ContactInfo;
  alternateContact?: ContactInfo;
  location: LocationDetails;
  
  itEquipment: ITEquipment[];
  furniture: Furniture[];
  digitalAssets: DigitalAsset[];
  userAccounts: UserAccount[];
  
  networkingRequirements: NetworkingRequirements;
  logisticsRequirements: LogisticsRequirements;
  timeline: Timeline;
  
  qualityChecks: QualityChecks;
  stakeholderCommunication: StakeholderCommunication;
  
  additionalNotes?: string;
  specialRequirements?: string;
  riskAssessment?: string;
  budgetConsiderations?: string;
  
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastModifiedBy: string;
  
  submittedAt?: Date;
  completedAt?: Date;
  
  auditTrail: AuditEvent[];
}

export interface AuditEvent {
  id: string;
  timestamp: Date;
  action: 'created' | 'updated' | 'submitted' | 'reviewed' | 'approved' | 'completed' | 'cancelled';
  user: string;
  changes?: Record<string, { from: unknown; to: unknown }>;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export interface ReportData {
  programClosure: ProgramClosureData;
  generatedAt: Date;
  generatedBy: string;
  reportType: 'comprehensive' | 'it-operations' | 'admin-operations' | 'timeline' | 'compliance';
}

export interface StakeholderReport {
  stakeholder: 'it-operations' | 'admin-operations' | 'program-director' | 'compliance';
  title: string;
  sections: ReportSection[];
  actionItems: ActionItem[];
  timeline: TimelineItem[];
}

export interface ReportSection {
  title: string;
  content: string;
  data?: Record<string, unknown>;
}

export interface ActionItem {
  id: string;
  description: string;
  assignedTo?: string;
  dueDate?: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
}

export interface TimelineItem {
  date: Date;
  event: string;
  description?: string;
  stakeholder?: string;
}

export type FormStep = 
  | 'program-info'
  | 'contacts'
  | 'location'
  | 'it-equipment'
  | 'furniture'
  | 'digital-assets'
  | 'networking'
  | 'logistics'
  | 'timeline'
  | 'review';