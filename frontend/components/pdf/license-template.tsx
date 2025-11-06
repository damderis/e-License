"use client"

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import type { Application } from '@/lib/types'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 20,
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#2563eb',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#475569',
    width: 150,
    flexShrink: 0,
  },
  value: {
    fontSize: 12,
    color: '#1e293b',
    flex: 1,
  },
  licenseInfo: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 20,
  },
  licenseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 10,
  },
  validUntil: {
    fontSize: 14,
    color: '#059669',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#64748b',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    borderRadius: 4,
    marginBottom: 15,
  },
  approved: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  pending: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  rejected: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
})

interface LicenseTemplateProps {
  application: Application
  licenseType: 'pasar' | 'hawker'
}

export function LicenseTemplate({ application, licenseType }: LicenseTemplateProps) {
  const marketLicense = licenseType === 'pasar' ? application.pasarLicense : null
  const hawkerLicense = licenseType === 'hawker' ? application.hawkerLicense : null
  const licenseTypeText = licenseType === 'pasar' ? 'Lesen Pasar' : 'Lesen Penjaja'
  
  // Generate license number
  const licenseNumber = `${licenseType.toUpperCase()}-${application.id.slice(-8).toUpperCase()}-${new Date().getFullYear()}`
  
  // Calculate expiry date (1 year from approval or creation)
  const approvalDate = application.reviewedAt || application.createdAt || new Date()
  const expiryDate = new Date(approvalDate)
  expiryDate.setFullYear(expiryDate.getFullYear() + 1)

  const getStatusStyle = () => {
    switch (application.status) {
      case 'approved':
        return [styles.status, styles.approved]
      case 'pending':
        return [styles.status, styles.pending]
      case 'rejected':
        return [styles.status, styles.rejected]
      default:
        return [styles.status, styles.pending]
    }
  }

  const getStatusText = () => {
    switch (application.status) {
      case 'approved':
        return 'DILULUSKAN'
      case 'pending':
        return 'MENUNGGU KELULUSAN'
      case 'rejected':
        return 'DITOLAK'
      default:
        return 'MENUNGGU KELULUSAN'
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image src="/placeholder-logo.png" />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{licenseTypeText.toUpperCase()}</Text>
            <Text style={styles.subtitle}>Portal Permohonan Lesen</Text>
          </View>
        </View>

        {/* Status */}
        <View style={getStatusStyle()}>
          <Text>{getStatusText()}</Text>
        </View>

        {/* License Information */}
        <View style={styles.licenseInfo}>
          <Text style={styles.licenseNumber}>No. Lesen: {licenseNumber}</Text>
          <Text style={styles.validUntil}>
            Sah Sehingga: {expiryDate.toLocaleDateString('ms-MY')}
          </Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MAKLUMAT PEMOHON</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nama:</Text>
            <Text style={styles.value}>{application.personalInfo.fullName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>No. IC:</Text>
            <Text style={styles.value}>{application.personalInfo.icNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{application.userEmail}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>No. Telefon:</Text>
            <Text style={styles.value}>{application.personalInfo.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Alamat:</Text>
            <Text style={styles.value}>{application.personalInfo.address}</Text>
          </View>
        </View>

        {/* License Specific Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MAKLUMAT {licenseTypeText.toUpperCase()}</Text>
          {licenseType === 'pasar' && marketLicense && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Jenis Pasar:</Text>
                <Text style={styles.value}>{marketLicense.jenisPasar}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Lokasi Pasar:</Text>
                <Text style={styles.value}>{marketLicense.lokasiPasar}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Jumlah Lot:</Text>
                <Text style={styles.value}>{marketLicense.jumlahLot}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Jenis Jualan:</Text>
                <Text style={styles.value}>
                  {marketLicense.jenisJualan.map((item, index) => 
                    `${item.category}: ${item.description}${index < marketLicense.jenisJualan.length - 1 ? ', ' : ''}`
                  ).join('')}
                </Text>
              </View>
            </>
          )}
          
          {licenseType === 'hawker' && hawkerLicense && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Jenis Perniagaan:</Text>
                <Text style={styles.value}>{hawkerLicense.hawkerType}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Lokasi Perniagaan:</Text>
                <Text style={styles.value}>{hawkerLicense.address}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Waktu Operasi:</Text>
                <Text style={styles.value}>{hawkerLicense.workingHours}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Jenis Produk:</Text>
                <Text style={styles.value}>{hawkerLicense.product}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Jenis Kenderaan:</Text>
                <Text style={styles.value}>{hawkerLicense.vehicleType}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>No. Pendaftaran:</Text>
                <Text style={styles.value}>{hawkerLicense.vehicleRegNo}</Text>
              </View>
            </>
          )}
        </View>

        {/* Application Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MAKLUMAT PERMOHONAN</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tarikh Permohonan:</Text>
            <Text style={styles.value}>
              {application.createdAt.toLocaleDateString('ms-MY')}
            </Text>
          </View>
          {application.reviewedAt && (
            <View style={styles.row}>
              <Text style={styles.label}>Tarikh Kelulusan:</Text>
              <Text style={styles.value}>
                {application.reviewedAt.toLocaleDateString('ms-MY')}
              </Text>
            </View>
          )}
          {application.reviewedBy && (
            <View style={styles.row}>
              <Text style={styles.label}>Disemak Oleh:</Text>
              <Text style={styles.value}>{application.reviewedBy}</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Dokumen ini dijana secara elektronik dan sah tanpa tandatangan fizikal.
          </Text>
          <Text>
            Untuk pertanyaan, sila hubungi pihak berkuasa yang berkenaan.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
