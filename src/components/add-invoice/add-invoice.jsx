import React, { useState, useEffect } from 'react';
import './add-invoice.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { addInvoice } from '../../service/InvoiceService';
import { getAllClients } from '../../service/ClientService';
import { getAllVendors } from '../../service/VendorService';
import { Link } from 'react-router-dom';
import { auth } from '../../config';
import { Navigate } from 'react-router-dom';
import { getUserByUserId } from '../../service/UserService';

const useStyles = makeStyles({
  inputRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'grey',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  },
});

function AddInvoice() {

  const [clients, setClients] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [opList, setOpList] = useState([]);
  const [usertype, setUserType] = useState('');
  const [compName, setcompName] = useState('');
  const [invNo, setinvNo] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [cgst, setcgst] = useState('');
  const [sgst, setsgst] = useState('');
  const [totalPrice, settotalPrice] = useState('');
  const [groupId, setGroupId] = useState('');

  const [sgstp, setSgstp] = useState(6);
  const [cgstp, setCgstp] = useState(6);

  useEffect(() => {

    const amountValue = Number(amount);
    const calculateTaxes = () => {
      const sgstValue = (amountValue * sgstp) / 100;
      const cgstValue = (amountValue * cgstp) / 100;
      // console.log("sgstv")
      // console.log(sgstValue);
      const totalPriceValue = amountValue + sgstValue + cgstValue;
      setsgst(sgstValue.toFixed(2));
      setcgst(cgstValue.toFixed(2));
      settotalPrice(totalPriceValue.toFixed(2));
    };
    calculateTaxes();

    const updateGroupId = auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        const response = await getUserByUserId(user.uid);
        setGroupId(response[0].groupId);
        console.log("groop", groupId)
      }
      else {
        <Navigate to={'/'} />;
      }
    });
    updateGroupId();
    getClientList(groupId);
    getVendorsList(groupId);
  }, [groupId, amount,sgstp,sgst,cgstp,cgst]);

  const userTypes = [
    {
      code: '1',
      label: 'Vendor'
    },
    {
      code: '2',
      label: 'Client'
    }
  ]

  const getVendorsList = async (groupId) => {
    const response = await getAllVendors(groupId);
    setVendors(response);
  }

  const calculateSGST = (e) =>{ 
    setSgstp(e.target.value);
    setsgst(amount*sgstp/100);
  }

  const calculateCGST = (e) =>{ 
    setCgstp(e.target.value);
    setcgst(amount*cgstp/100);
  }

  const getClientList = async (groupId) => {
    const response = await getAllClients(groupId);
    setClients(response);
  }

  const getOptions = (user) => {
    var options = [];
    if (user === 'Vendor') {
      vendors.forEach(element => {
        const vendor = {
          "name": element.name,
          "id": element.id
        }
        options.push(vendor);
      });
    }
    else {
      clients.forEach(element => {
        const client = {
          "name": element.clientName,
          "id": element.id
        }
        options.push(client);
      });
    }
    return options;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addInvoice(invoice);
    setUserType('');
    setcompName('');
    setinvNo('');;
    setDate('');
    setAmount('');
    setcgst('');
    setsgst('');
    settotalPrice('');
  };

  const invoice = {
    usertype,
    compName,
    invNo,
    date,
    amount,
    cgst,
    sgst,
    totalPrice,
    groupId
  }

  const handleUserChange = (event, value) => {
    const user = value ? value.label : "";
    setUserType(user);
    setOpList(getOptions(user));
    console.log(user);
  };

  const handleComchange = (event, value) => {
    if (value != null) {
      const client = value;
      console.log(client.name);
      setcompName(client.name)
    }
  };

  const classes = useStyles();
  return (
    <>
      <div className="ai-header-container">
        <h1 className="addInvoice-header">ADD INVOICE</h1>
        <div className='div-btn1'><Link to="/listinvoice"><button className='view-btn1'>View Details</button></Link></div>
      </div>

      <div className='addinvoice-container'>
        <form className='add-invoice-form' onSubmit={handleSubmit}>
          <div className='addinvoice-div'>
            <label>User Type</label>
            <div className='auto-comp'>
              <Autocomplete
                id='usertype'
                options={userTypes}
                getOptionLabel={(option) => option.label}
                getOptionSelected={(option, value) => option.id === value.id}
                onChange={handleUserChange}
                renderInput={(params) => <TextField {...params} className={classes.inputRoot} id='usertype-textfield' placeholder='Choose User Type' name='usertype' />}
                required
              />
            </div>

            <label>Company Name</label>
            <div className='auto-comp'>
              <Autocomplete
                id='compName'
                options={opList}
                onChange={handleComchange}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} className={classes.inputRoot}
                  placeholder='Choose Company Name' name='compName'
                  value={compName}
                  required />}
              />
            </div>
          </div>

          <div className='addinvoice-div generalInput'>
            <label>Invoice No</label>
            <input type="text" className='invoice-no' name='invNo' onChange={(e) => setinvNo(e.target.value)}
              value={invNo} placeholder='Invoice No' pattern="[a-zA-Z0-9]+" maxLength="15" required />

            <label>Date</label>
            <input type="date" name='date' value={date} onChange={(e) => setDate(e.target.value)} className='date' required />
          </div>

          <div className='addinvoice-div generalInput'>
            <div>
              <label>Amount</label>
              <input type="number" name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} className='amount' placeholder='Base Price' required />
            </div>

            <div className='sg'>
              <label>SGST Percentage</label>
              <input type="number" id='sgst_per' placeholder='6%' value={sgstp} onChange={calculateSGST}  required contentEditable />
            </div>
          </div>

          <div className='addinvoice-div generalInput'>
            <div className='cg'>
              <label>Total SGST</label>
              <input type="number" name='sgst' value={sgst} id='sgst_val' className='sgst' placeholder='Total SGST' required readOnly />
            </div>

            <div>
              <label>CGST Percentage</label>
              <input type="number" id='cgst_per' placeholder='6%' value={cgstp} onChange={calculateCGST}  required contentEditable />
            </div>
          </div>

          <div className='addinvoice-div generalInput'>
            <div className='cg'>
              <label>Total CGST</label>
              <input type="number" id='cgst_val' name='cgst' value={cgst} className='cgst' placeholder='CGST' required readOnly />
            </div>

            <div>
              <label>Total Price</label>
              <input type="number" name='totalPrice' value={totalPrice} className='total-price' placeholder='Total Price' required readOnly />
            </div>
          </div>

          <button className='btn-save'>Save</button>

        </form>

      </div>
    </>
  )
}

export default AddInvoice;

