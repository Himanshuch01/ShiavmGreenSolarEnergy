/**
 * Admin Dashboard
 * 
 * Main admin panel that displays contact form submissions.
 * Completely isolated from public site components.
 * 
 * Features:
 * - Display contact inquiries in table format
 * - Real-time data fetching from Supabase
 * - Logout functionality
 * - Read-only view with sanitized output
 * - No SEO indexing
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LogOut, Mail, Phone, User, MessageSquare, Calendar, RefreshCw, Loader } from 'lucide-react';
import { logout } from '@/lib/auth';
import { fetchContactInquiries, sanitizeText, formatDate, type ContactInquiry } from '@/lib/adminService';

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadInquiries = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const data = await fetchContactInquiries();
      setInquiries(data);
    } catch (err) {
      setError('Failed to load contact inquiries. Please try again.');
      console.error('Error loading inquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin', { replace: true });
  };

  const handleRefresh = () => {
    loadInquiries();
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Shivam Green Solar Energy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div>
              <h1 style={styles.headerTitle}>Admin Dashboard</h1>
              <p style={styles.headerSubtitle}>Shivam Green Solar Energy</p>
            </div>
            <div style={styles.headerActions}>
              <button onClick={handleRefresh} style={styles.refreshButton} title="Refresh">
                <RefreshCw size={18} />
              </button>
              <button onClick={handleLogout} style={styles.logoutButton}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          <div style={styles.content}>
            {/* Stats Card */}
            <div style={styles.statsCard}>
              <div style={styles.statItem}>
                <MessageSquare size={24} style={styles.statIcon} />
                <div>
                  <div style={styles.statValue}>{inquiries.length}</div>
                  <div style={styles.statLabel}>Total Inquiries</div>
                </div>
              </div>
            </div>

            {/* Inquiries Section */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Contact Inquiries</h2>

              {error && (
                <div style={styles.errorAlert}>
                  <span>{error}</span>
                </div>
              )}

              {isLoading ? (
                <div style={styles.loadingContainer}>
                  <Loader size={32} style={styles.spinner} />
                  <p>Loading inquiries...</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div style={styles.emptyState}>
                  <MessageSquare size={48} style={styles.emptyIcon} />
                  <p style={styles.emptyText}>No contact inquiries yet</p>
                </div>
              ) : (
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.tableHeader}>Date</th>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Email</th>
                        <th style={styles.tableHeader}>Phone</th>
                        <th style={styles.tableHeader}>Service</th>
                        <th style={styles.tableHeader}>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry.id} style={styles.tableRow}>
                          <td style={styles.tableCell}>
                            <div style={styles.cellContent}>
                              <Calendar size={14} style={styles.cellIcon} />
                              <span>{formatDate(inquiry.created_at)}</span>
                            </div>
                          </td>
                          <td style={styles.tableCell}>
                            <div style={styles.cellContent}>
                              <User size={14} style={styles.cellIcon} />
                              <span>{sanitizeText(inquiry.name)}</span>
                            </div>
                          </td>
                          <td style={styles.tableCell}>
                            <div style={styles.cellContent}>
                              <Mail size={14} style={styles.cellIcon} />
                              <a 
                                href={`mailto:${inquiry.email}`}
                                style={styles.emailLink}
                              >
                                {sanitizeText(inquiry.email)}
                              </a>
                            </div>
                          </td>
                          <td style={styles.tableCell}>
                            <div style={styles.cellContent}>
                              <Phone size={14} style={styles.cellIcon} />
                              <a 
                                href={`tel:${inquiry.phone}`}
                                style={styles.phoneLink}
                              >
                                {sanitizeText(inquiry.phone)}
                              </a>
                            </div>
                          </td>
                          <td style={styles.tableCell}>
                            <span style={styles.serviceBadge}>
                              {sanitizeText(inquiry.service)}
                            </span>
                          </td>
                          <td style={styles.tableCell}>
                            <div style={styles.messageCell}>
                              {sanitizeText(inquiry.message)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// Scoped styles - completely isolated from global styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: '1rem 1.5rem',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1a202c',
    margin: 0,
  },
  headerSubtitle: {
    fontSize: '0.875rem',
    color: '#718096',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  refreshButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#fc8181',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  main: {
    padding: '2rem 1.5rem',
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statIcon: {
    color: '#667eea',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1a202c',
    lineHeight: '1',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#718096',
    marginTop: '0.25rem',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '1.5rem',
  },
  errorAlert: {
    padding: '1rem',
    backgroundColor: '#fee',
    color: '#c53030',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    color: '#718096',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
  },
  emptyIcon: {
    color: '#cbd5e0',
    marginBottom: '1rem',
  },
  emptyText: {
    color: '#718096',
    fontSize: '1rem',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.875rem',
  },
  tableHeaderRow: {
    backgroundColor: '#f7fafc',
  },
  tableHeader: {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#4a5568',
    borderBottom: '2px solid #e2e8f0',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
    transition: 'background-color 0.2s',
  },
  tableCell: {
    padding: '1rem',
    verticalAlign: 'top',
  },
  cellContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  cellIcon: {
    color: '#a0aec0',
    flexShrink: 0,
  },
  emailLink: {
    color: '#667eea',
    textDecoration: 'none',
  },
  phoneLink: {
    color: '#667eea',
    textDecoration: 'none',
  },
  serviceBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    backgroundColor: '#e6fffa',
    color: '#234e52',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  messageCell: {
    maxWidth: '300px',
    lineHeight: '1.5',
    color: '#4a5568',
  },
};

// Add keyframes for spinner animation
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {
    // Ignore if rule already exists
  }
}

export default AdminDashboard;
