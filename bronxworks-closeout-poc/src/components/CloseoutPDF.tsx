import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { CloseoutDetails } from '../types/closeout';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    borderBottom: '3 solid #2bc4b2',
    paddingBottom: 15,
    backgroundColor: '#f0fdfa',
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#134e4a',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#2bc4b2',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  organizationName: {
    fontSize: 18,
    color: '#f7215e',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    backgroundColor: '#2bc4b2',
    color: '#ffffff',
    padding: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    width: '60%',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2bc4b2',
    color: '#ffffff',
    padding: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #ccc',
    padding: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#2bc4b2',
    borderTop: '1 solid #2bc4b2',
    paddingTop: 8,
  },
  contactBox: {
    border: '2 solid #2bc4b2',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f0fdfa',
    borderRadius: 4,
  },
  equipmentItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f0fdfa',
    border: '1 solid #ccfbf1',
    borderRadius: 4,
  },
});

interface CloseoutPDFProps {
  data: CloseoutDetails;
}

export function CloseoutPDF({ data }: CloseoutPDFProps) {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Not specified';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM d, yyyy');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.organizationName}>BRONXWORKS</Text>
          <Text style={styles.title}>PROGRAM CLOSEOUT REPORT</Text>
          <Text style={styles.subtitle}>IT & Operations Department</Text>
          <Text style={[styles.subtitle, { fontSize: 10, marginTop: 8 }]}>Generated: {format(new Date(), 'MMMM d, yyyy h:mm a')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROGRAM INFORMATION</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Program Name:</Text>
            <Text style={styles.value}>{data.programName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Program Type:</Text>
            <Text style={styles.value}>{data.programType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Staff:</Text>
            <Text style={styles.value}>{data.totalStaff}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Last Operational Date:</Text>
            <Text style={styles.value}>{formatDate(data.lastOperationalDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Target Closeout Date:</Text>
            <Text style={styles.value}>{formatDate(data.closeoutDate)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LOCATION DETAILS</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Building:</Text>
            <Text style={styles.value}>{data.location.building}</Text>
          </View>
          {data.location.floor && (
            <View style={styles.row}>
              <Text style={styles.label}>Floor:</Text>
              <Text style={styles.value}>{data.location.floor}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{data.location.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIMARY CONTACT</Text>
          <View style={styles.contactBox}>
            <Text>{data.primaryContact.name} - {data.primaryContact.title}</Text>
            <Text>Email: {data.primaryContact.email}</Text>
            <Text>Phone: {data.primaryContact.phone}</Text>
            {data.primaryContact.department && (
              <Text>Department: {data.primaryContact.department}</Text>
            )}
          </View>
          
          {data.alternateContact?.name && (
            <>
              <Text style={[styles.sectionTitle, { fontSize: 12 }]}>ALTERNATE CONTACT</Text>
              <View style={styles.contactBox}>
                <Text>{data.alternateContact.name} - {data.alternateContact.title}</Text>
                <Text>Email: {data.alternateContact.email}</Text>
                <Text>Phone: {data.alternateContact.phone}</Text>
                {data.alternateContact.department && (
                  <Text>Department: {data.alternateContact.department}</Text>
                )}
              </View>
            </>
          )}
        </View>

        <View style={styles.footer}>
          <Text>Page 1 of 3 | BronxWorks Program Closeout Report | {data.programName}</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IT EQUIPMENT INVENTORY ({data.equipment.length} items)</Text>
          {data.equipment.length === 0 ? (
            <Text>No equipment listed</Text>
          ) : (
            data.equipment.map((item, index) => (
              <View key={item.id} style={styles.equipmentItem}>
                <Text style={{ fontWeight: 'bold' }}>Item {index + 1}: {item.description}</Text>
                <Text>Type: {item.type} | Quantity: {item.quantity}</Text>
                {item.assetTag && <Text>Asset Tag: {item.assetTag}</Text>}
                {item.location && <Text>Location: {item.location}</Text>}
                {item.specialInstructions && (
                  <Text style={{ fontStyle: 'italic' }}>Special Instructions: {item.specialInstructions}</Text>
                )}
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NETWORKING EQUIPMENT</Text>
          <View style={styles.row}>
            <Text style={styles.label}>WiFi Access Points:</Text>
            <Text style={styles.value}>{data.networkingRequirements.wifiAccessPoints || 0}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Network Printers:</Text>
            <Text style={styles.value}>{data.networkingRequirements.networkPrinters || 0}</Text>
          </View>
          {data.networkingRequirements.specialNetworkNeeds && (
            <View style={{ marginTop: 5 }}>
              <Text style={styles.label}>Special Requirements:</Text>
              <Text>{data.networkingRequirements.specialNetworkNeeds}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FURNITURE INVENTORY ({data.furniture.length} items)</Text>
          {data.furniture.length === 0 ? (
            <Text>No furniture listed</Text>
          ) : (
            data.furniture.map((item, index) => (
              <View key={item.id} style={styles.equipmentItem}>
                <Text style={{ fontWeight: 'bold' }}>Item {index + 1}: {item.description}</Text>
                <Text>Type: {item.type} | Quantity: {item.quantity} | Condition: {item.condition}</Text>
                <Text>Disposition: {item.disposition}</Text>
                {item.location && <Text>Location: {item.location}</Text>}
              </View>
            ))
          )}
        </View>

        <View style={styles.footer}>
          <Text>Page 2 of 3 | BronxWorks Program Closeout Report | {data.programName}</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MICROSOFT 365 ACCOUNTS ({data.m365Accounts.length} accounts)</Text>
          {data.m365Accounts.length === 0 ? (
            <Text>No M365 accounts listed</Text>
          ) : (
            data.m365Accounts.map((account) => (
              <View key={account.id} style={styles.equipmentItem}>
                <Text style={{ fontWeight: 'bold' }}>{account.employeeName}</Text>
                <Text>Email: {account.email}</Text>
                {account.userName && <Text>Username: {account.userName}</Text>}
                <Text>Data Backup Required: {account.dataBackupRequired ? 'Yes' : 'No'}</Text>
                {account.backupInstructions && (
                  <Text style={{ fontStyle: 'italic' }}>Backup Instructions: {account.backupInstructions}</Text>
                )}
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TIMELINE</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Final Vacate Date:</Text>
            <Text style={styles.value}>{formatDate(data.timeline.finalVacateDate)}</Text>
          </View>
          {data.timeline.equipmentPickupDate && (
            <View style={styles.row}>
              <Text style={styles.label}>Equipment Pickup:</Text>
              <Text style={styles.value}>{formatDate(data.timeline.equipmentPickupDate)}</Text>
            </View>
          )}
          {data.timeline.furniturePickupDate && (
            <View style={styles.row}>
              <Text style={styles.label}>Furniture Pickup:</Text>
              <Text style={styles.value}>{formatDate(data.timeline.furniturePickupDate)}</Text>
            </View>
          )}
          {data.timeline.keyReturnDate && (
            <View style={styles.row}>
              <Text style={styles.label}>Key Return Date:</Text>
              <Text style={styles.value}>{formatDate(data.timeline.keyReturnDate)}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PHYSICAL MOVE REQUIREMENTS</Text>
          <Text>Packing Required: {data.physicalMoveRequirements.packingRequired ? 'Yes' : 'No'}</Text>
          <Text>Elevator Required: {data.physicalMoveRequirements.elevatorRequired ? 'Yes' : 'No'}</Text>
          {data.physicalMoveRequirements.accessRestrictions && (
            <Text>Access Restrictions: {data.physicalMoveRequirements.accessRestrictions}</Text>
          )}
          {data.physicalMoveRequirements.labelingInstructions && (
            <Text>Labeling Instructions: {data.physicalMoveRequirements.labelingInstructions}</Text>
          )}
          {data.physicalMoveRequirements.specialHandling && (
            <Text>Special Handling: {data.physicalMoveRequirements.specialHandling}</Text>
          )}
        </View>

        {(data.specialRequirements || data.additionalNotes) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ADDITIONAL INFORMATION</Text>
            {data.specialRequirements && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.label}>Special Requirements:</Text>
                <Text>{data.specialRequirements}</Text>
              </View>
            )}
            {data.additionalNotes && (
              <View>
                <Text style={styles.label}>Additional Notes:</Text>
                <Text>{data.additionalNotes}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.footer}>
          <Text>Page 3 of 3 | BronxWorks Program Closeout Report | {data.programName}</Text>
        </View>
      </Page>
    </Document>
  );
}