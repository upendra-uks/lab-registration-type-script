import { FunctionComponent, useState, useEffect } from "react";
import styles from "./LabRegistrationForm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTimezone } from "../store/timezoneSlice";
import { RootState } from "../store/store";
//const SERVER_URL =  process.env.REACT_APP_SERVER_URL
//const GET_URL =  SERVER_URL + 'api/'
export type RootType = {
  className?: string;
};

interface ValidationErrors {
  labName?: string;
  providerGroup?: string;
  providerUnit?: string;
  address?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  officePhone?: string;
  mobile?: string;
  email?: string;
  timezone?: string;
}
const LabRegistrationForm: FunctionComponent<RootType> = ({
  className = "",
}) => {
  const [formData, setFormData] = useState({
    labName: "",
    providerGroup: "",
    providerUnit: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    officePhone: "",
    mobile: "",
    email: "",
    timeZone: "",
  });

  // Initialize the state with an empty array of ProviderGroup
  const [providerGroups, setProviderGroups] = useState<ProviderGroup[]>([]);
  const [providerUnits, setProviderUnits] = useState<ProviderUnit[]>([]);
  const [timezones, setTimezones] = useState<TimeZone[]>([]);

  const dispatch = useDispatch();
  const selectedTimezone = useSelector(
    (state: RootState) => state.timezone.timezone
  );

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});


  interface ProviderGroup {
    id: string; // or number, depending on your API data
    provider_group: string;
  }
  interface ProviderUnit {
    id: string; // or number, depending on your API data
    provider_unit: string;
  }
  interface TimeZone {
    id: string; // or number, depending on your API data
    name: string;
    abbreviation: string;
  }
  useEffect(() => {
    const fetchProviderGroups = async () => {
      try {
        const response = await axios.get<ProviderGroup[]>(
          "http://localhost:3005/api/providerGroup"
        );
        //console.log('uks',response.data); // Add this line to check the response
        setProviderGroups(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching provider groups:", error);
      }
    };

    fetchProviderGroups();
    const fetchProviderUnits = async () => {
      try {
        //for testing API URL hard coded need to replace with .env url
        const response = await axios.get<ProviderUnit[]>(
          "http://localhost:3005/api/providerUnit"
        );
        //console.log('uks',response.data); // Add this line to check the response
        setProviderUnits(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching provider unit:", error);
      }
    };

    fetchProviderUnits();
    const fetchTimeZones = async () => {
      try {
        const response = await axios.get<TimeZone[]>(
          "http://localhost:3005/api/timezone"
        );
        console.log("timezone", response.data); // Add this line to check the response
        setTimezones(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching timezone:", error);
      }
    };

    fetchTimeZones();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    const errors: ValidationErrors = {};
    // Validation logic
    if (!formData.labName) errors.labName = 'Lab Name is required';
    if (!formData.providerGroup) errors.providerGroup = 'Provider Group is required';
    if (!formData.providerUnit) errors.providerUnit = 'Provider Unit is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.zipCode) errors.zipCode = 'Zip Code is required';
    if (!formData.officePhone) errors.officePhone = 'Office Phone is required';
    if (!formData.mobile) errors.mobile = 'Mobile is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.timeZone) errors.timezone = 'Timezone is required';
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Handle form submission
    console.log('Form submitted', formData);

    try {
      console.log("form data", formData);
      const response = await axios.post(
        "http://localhost:3005/api/save",
        formData
      );
      //hard code will replace with .env path
      console.log("Lab details saved:", response.data);
      alert("Lab details saved successfully");
    } catch (error) {
      console.error("Error saving lab details:", error);
      alert("Error saving lab details");
    }
    dispatch(setTimezone('Pacific Time (UTC-08:00)')); // Example timezone;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={[styles.root, className].join(" ")}
    >
      <div className={styles.header}>
        <div className={styles.back}>
          <img
            className={styles.iconIcChevronLeft}
            alt=""
            src="/icon-ic-chevron-left.svg"
          />
        </div>
        <input className={styles.pageTitle} placeholder="Add Lab" type="text" />
      </div>
      <section className={styles.demographics}>
        <div className={styles.sidePanel}>
          <div className={styles.basicDetails}>
            <b className={styles.basicDetails1}>Basic Details</b>
          </div>
          <div className={styles.licensing}>
            <b className={styles.licensing1}>Configuration</b>
          </div>
          <div className={styles.governmentId}>
            <b className={styles.governmentId1}>Identification</b>
          </div>
          <div className={styles.governmentId2}>
            <b className={styles.governmentId3}>Settings</b>
          </div>
          <div className={styles.accountSettings}>
            <b className={styles.basicDetails2}>Account Settings</b>
          </div>
        </div>
        <div className={styles.demographicInformation}>
          <div className={styles.info}>
            <div className={styles.detailsContainer}>
              <div className={styles.details}>
                <div className={styles.header1}>
                  <b className={styles.text}>Details</b>
                  <img className={styles.endIcon} alt="" src="/end-icon.svg" />
                  <div className={styles.inputBox}>
                    <img
                      className={styles.startIcon}
                      alt=""
                      src="/start-icon.svg"
                    />
                    <b className={styles.text1}>Active</b>
                    <img
                      className={styles.endIcon1}
                      alt=""
                      src="/end-icon1@2x.png"
                    />
                    <img
                      className={styles.dropdownIcon}
                      alt=""
                      src="/dropdown.svg"
                    />
                  </div>
                </div>
                <div className={styles.contactDetails}>
                  <div className={styles.row5}>
                    <div className={styles.inputGroup}>
                      <div className={styles.dropdownMain}>
                        <div className={styles.dropdownLabel}>
                          <div className={styles.label}>Lab Name</div>
                          <div className={styles.asterisk}>*</div>
                        </div>
                        <div className={styles.inputBox1}>
                          <img
                            className={styles.startIcon1}
                            alt=""
                            src="/start-icon.svg"
                          />
                          <input
                            className={styles.text2}
                            placeholder="Enter"
                            type="text"
                            name="labName"
                            value={formData.labName}
                            onChange={handleInputChange}
                          />
                          <img
                            className={styles.endIcon2}
                            alt=""
                            src="/end-icon1@2x.png"
                          />
                          <img
                            className={styles.dropdownIcon1}
                            alt=""
                            src="/dropdown.svg"
                          />
                          
                        </div>
                        {validationErrors.labName && <div className={styles.error}>{validationErrors.labName}</div>}
                      </div>
                    </div>
                  </div>
                  <div className={styles.row7}>
                    <div className={styles.inputGroup1}>
                      <div className={styles.dropdownMain1}>
                        <div className={styles.labelParent}>
                          <div className={styles.label1}>Provider Group</div>
                          <div className={styles.asterisk1}>*</div>
                        </div>
                        <div className={styles.inputBox2}>
                          <img
                            className={styles.startIcon2}
                            alt=""
                            src="/start-icon.svg"
                          />
                          <select
                            className={styles.text3}
                            value={formData.providerGroup}
                            onChange={(e) =>
                              handleSelectChange(
                                "providerGroup",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select</option>
                            {providerGroups.map((group: ProviderGroup) => (
                              <option key={group.id} value={group.id}>
                                {group.provider_group}
                              </option>
                            ))}
                          </select>
                            </div>
                      </div>
                      {validationErrors.providerGroup && <div className={styles.error}>{validationErrors.providerGroup}</div>}
                     
                    </div>
                    <div className={styles.inputGroup2}>
                      <div className={styles.dropdownMain2}>
                        <div className={styles.dropdownInputFieldLabel}>
                          <div className={styles.label2}>Provider Unit</div>
                          <div className={styles.asterisk2}>*</div>
                        </div>
                        <div className={styles.inputBox3}>
                          <img
                            className={styles.startIcon3}
                            alt=""
                            src="/start-icon.svg"
                          />
                          <select
                            className={styles.text3}
                            value={formData.providerUnit}
                            onChange={(e) =>
                              handleSelectChange("providerUnit", e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            {providerUnits.map((group: ProviderUnit) => (
                              <option key={group.id} value={group.id}>
                                {group.provider_unit}
                              </option>
                            ))}
                          </select>
                          <img
                            className={styles.endIcon4}
                            alt=""
                            src="/end-icon1@2x.png"
                          />
                        </div>
                      </div>
                      {validationErrors.providerUnit && <div className={styles.error}>{validationErrors.providerUnit}</div>}
                   
                    </div>
                     
                  </div>
                  <div className={styles.row4}>
                    <div className={styles.row01}>
                      <div className={styles.dropdownMain3}>
                        <div className={styles.labelGroup}>
                          <div className={styles.label3}>Address</div>
                          <div className={styles.asterisk3}>*</div>
                        </div>
                        <div className={styles.inputBox4}>
                          <img
                            className={styles.startIcon4}
                            alt=""
                            src="/start-icon.svg"
                          />
                          <input
                            className={styles.text4}
                            placeholder="Street Name"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                          <img
                            className={styles.endIcon5}
                            alt=""
                            src="/end-icon1@2x.png"
                          />
                          <img
                            className={styles.dropdownIcon4}
                            alt=""
                            src="/dropdown.svg"
                          />
                        </div>
                      </div>
                      {validationErrors.address && <div className={styles.error}>{validationErrors.address}</div>}
                   
                    </div>
                  </div>
                  <div className={styles.row6}>
                    <div className={styles.inputGroup3}>
                      <div className={styles.dropdownMain4}>
                        <div className={styles.labelContainer}>
                          <div className={styles.label4}>State</div>
                          <div className={styles.asterisk4}>*</div>
                        </div>
                        <div className={styles.inputBox5}>
                          <img
                            className={styles.startIcon5}
                            alt=""
                            src="/start-icon.svg"
                          />
                          <select
                            className={styles.text3}
                            value={formData.state}
                            onChange={(e) =>
                              handleSelectChange("state", e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            <option value="state1">State1</option>
                            <option value="state2">State2</option>
                            <option value="state3">State3</option>
                            <option value="state4">State4</option>
                          </select>
                        </div>
                      </div>
                      {validationErrors.state && <div className={styles.error}>{validationErrors.state}</div>}
                   
                    </div>
                    <div className={styles.inputGroup4}>
                      <div className={styles.dropdownMain5}>
                        <div className={styles.frameDiv}>
                          <div className={styles.label5}>City</div>
                          <div className={styles.asterisk5}>*</div>
                        </div>
                        <div className={styles.inputBox6}>
                          <img
                            className={styles.startIcon6}
                            alt=""
                            src="/start-icon.svg"
                          />

                          <select
                            className={styles.text3}
                            value={formData.city}
                            onChange={(e) =>
                              handleSelectChange("city", e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            <option value="City1">City1</option>
                            <option value="City2">City2</option>
                            <option value="City3">City3</option>
                            <option value="City4">City4</option>
                          </select>
                        </div>
                      </div>
                      {validationErrors.city && <div className={styles.error}>{validationErrors.city}</div>}
                   
                    </div>
                    <div className={styles.inputGroup5}>
                      <div className={styles.dropdownMain6}>
                        <div className={styles.singleDropdownLabel}>
                          <div className={styles.label6}>Zip Code</div>
                          <div className={styles.asterisk6}>*</div>
                        </div>
                        <div className={styles.inputBox7}>
                          <img
                            className={styles.startIcon7}
                            alt=""
                            src="/start-icon.svg"
                          />
                          <input
                            className={styles.singleDropdownValue}
                            placeholder="Enter"
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                          />
                          <img
                            className={styles.endIcon8}
                            alt=""
                            src="/end-icon1@2x.png"
                          />
                          <img
                            className={styles.dropdownIcon7}
                            alt=""
                            src="/dropdown2.svg"
                          />
                        </div>
                      </div>
                      {validationErrors.zipCode && <div className={styles.error}>{validationErrors.zipCode}</div>}
                   
                    </div>
                  </div>
                  <div className={styles.row3}>
                    <div className={styles.inputGroup6}>
                      <div className={styles.labelParent1}>
                        <div className={styles.label7}>Office Phone</div>
                        <div className={styles.div}>*</div>
                      </div>
                      <div className={styles.textboxDropdown}>
                        <div className={styles.dropdown}>
                          <div className={styles.div1}>+1</div>
                          <img
                            className={styles.dropdownIcon8}
                            alt=""
                            src="/dropdown.svg"
                          />
                        </div>
                        <div className={styles.textbox}>
                          <input
                            className={styles.enter}
                            placeholder="Enter"
                            type="text"
                            name="officePhone"
                            value={formData.officePhone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {validationErrors.officePhone && <div className={styles.error}>{validationErrors.officePhone}</div>}
                   
                    </div>
                    <div className={styles.inputGroup7}>
                      <div className={styles.labelParent2}>
                        <div className={styles.label8}>Mobile</div>
                        <div className={styles.div2}>*</div>
                      </div>
                      <div className={styles.textboxDropdown1}>
                        <div className={styles.dropdown1}>
                          <div className={styles.anotherDropdownOption}>+1</div>
                          <img
                            className={styles.dropdownIcon9}
                            alt=""
                            src="/dropdown.svg"
                          />
                        </div>
                        <div className={styles.textbox1}>
                          <input
                            className={styles.enter1}
                            placeholder="Enter"
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {validationErrors.mobile && <div className={styles.error}>{validationErrors.mobile}</div>}
                   
                    </div>
                  </div>
                  <div className={styles.row011}>
                    <div className={styles.inputGroup8}>
                      <div className={styles.dropdownMain7}>
                        <div className={styles.labelParent3}>
                          <div className={styles.label9}>Email id</div>
                          <div className={styles.asterisk7}>*</div>
                        </div>
                        <div className={styles.inputBox8}>
                          <img
                            className={styles.startIcon8}
                            alt=""
                            src="/start-icon.svg"
                          />
                          <input
                            className={styles.text7}
                            placeholder="Enter"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          <img
                            className={styles.endIcon9}
                            alt=""
                            src="/end-icon1@2x.png"
                          />
                          <img
                            className={styles.dropdownIcon10}
                            alt=""
                            src="/dropdown.svg"
                          />
                        </div>
                      </div>
                      {validationErrors.email && <div className={styles.error}>{validationErrors.email}</div>}
                   
                    </div>
                  </div>
                  <div className={styles.divider}>
                    <div className={styles.layer} />
                  </div>
                </div>
              </div>
              <div className={styles.portalTimeZone}>
                <div className={styles.headerParent}>
                  <input
                    className={styles.header2}
                    placeholder="Portal Time zone"
                    type="text"
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleInputChange}
                  />
                  <div className={styles.contactDetails1}>
                    <div className={styles.row51}>
                      <div className={styles.inputGroup9}>
                        <div className={styles.dropdownMain8}>
                          <div className={styles.timeZoneDropdownLabel}>
                            <div className={styles.label10}>Time zone</div>
                            <div className={styles.asterisk8}>*</div>
                          </div>
                          <div className={styles.inputBox3}>
                            <select
                              className={styles.text3}
                              value={formData.timeZone}
                              onChange={(e) =>
                                handleSelectChange("timeZone", e.target.value)
                              }
                            >
                              <option value="">Select</option>
                              {timezones.map((group: TimeZone) => (
                                <option
                                  key={group.id}
                                  value={
                                    group.name + "(" + group.abbreviation + ")"
                                  }
                                >
                                  {group.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {validationErrors.timezone && <div className={styles.error}>{validationErrors.timezone}</div>}
                   
                      </div>
                      <div className={styles.inputGroup10}>
                        <div className={styles.dropdownMain9}>
                          <div className={styles.footer}>
                            <div className={styles.label11}>Time zone</div>
                            <div className={styles.asterisk9}>*</div>
                          {/*<div>Selected Timezone: {selectedTimezone}</div>  */}
                          </div>
                          <input
                            className={styles.inputBox10}
                            placeholder="Central America (UTC-06:00)"
                            type="text"
                            name="timeZone"
                            value={formData.timeZone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.divider1}>
                      <div className={styles.layer1} />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer1}>
            <div className={styles.popupFooter}>
              <div className={styles.buttonactionDeciderPopup}>
                <button className={styles.button} onClick={handleSubmit}>
                  <img
                    className={styles.iconStart}
                    alt=""
                    src="/start-icon.svg"
                  />
                  <b className={styles.title}>Register Lab</b>
                  <img
                    className={styles.iconEnd}
                    alt=""
                    src="/start-icon.svg"
                  />
                </button>
                <div className={styles.button1}>
                  <b className={styles.text8}>{`Save & Proceed`}</b>
                </div>
                <div className={styles.button2}>
                  <b className={styles.text9}>Cancel</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default LabRegistrationForm;
