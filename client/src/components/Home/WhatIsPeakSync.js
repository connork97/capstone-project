import styles from './WhatIsPeakSync.module.css';
import gymEmployee from '../../images/rock_climbing_gym_employee.png';

const WhatIsPeakSync = ({whatIsPeakSyncRef}) => {
    return (
        <div className={styles.WhatIsPeakSyncWrapper}>
            <div className={styles.employeeWrapper} ref={whatIsPeakSyncRef}>
                <div className={styles.employeeDiv}>
                    {/* <img className={styles.gymEmployeeImage} src={gymEmployee}></img> */}
                    <div className={styles.employeeDescriptionDiv}>
                        <h2 className={styles.employeeDescriptionH2}>PeakSync is for Employees</h2>
                        <p className={styles.employeeDescriptionP}>
                            From basic point of sale transactions, to managing classes old and new, to accessing the entire database of customers, PeakSync streamlines the entire process.
                        </p>
                        <br></br>
                        <p className={styles.employeeDescriptionP}>
                            No more switching from one system to another for bookings, waivers, or transactions, PeakSync keeps everything localized to just one system.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.customerWrapper}>
                <div className={styles.customerDiv}>
                    <div className={styles.customerDescriptionDiv}>
                        <h2 className={styles.customerDescriptionH2}>PeakSync is for Customers</h2>
                        <p className={styles.customerDescriptionP}>
                            No need to visit in person, or even call whenever you'd like to make changes to your account.  Simply create your account, and just log into your profile to update your information, make new bookings, or purchase a membership.
                        </p>
                        <br></br>
                        <p className={styles.customerDescriptionP}>
                            Most changes can be done from the comfor of your home.  If you still need or want help, you can always call in or show up in person.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WhatIsPeakSync;