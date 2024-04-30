import Feedback from "react-bootstrap/esm/Feedback";

const FAQlist = () => {
    const [faqs, setFaqs] = useState([]);
    const [updateFaqs, setUpdateFaqs] = useState({
        question: '',
        answer: ''
    });
    
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        const { question, value } = e.target;
        setUpdateFaqs(prevState => ({
            ...prevState,
            [question]: value
        }));
        };

    const handleClose = () =>{
        setShow(false);
        setUpdateFaqs(null);
    }
    const handleShow = (Feedback) => {
        setShow(true);
        setUpdateFaqs(Feedback);
    }

    const getAllFaqs = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/faqs/get-all');
            setFaqs(response.data.faqs)
            console.log(response.data.faqs);
            setFaqs(data);
        }catch (error) {
            //alart(error)
        }
    }

    const deleteFaqs = async (FAQId) => {
       confirmAlert({
           title: 'Confirm to delete',
           message: 'Are you sure to do this.',
           buttons: [
               {
                   label: 'Yes',
                   onClick: async () => {
                       try {
                           await fetch(`http://localhost:8000/api/faqs/delete/${FAQId}`, {
                               method: 'DELETE'
                           });
                           getAllFaqs();
                       } catch (error) {
                           console.log(error);
                       }
                   }
               },
               {
                   label: 'No',
                   onClick: () => {}
               }
           ]
       });

    }
    const handleUpdate = async () => {
        if(!updateFaqs.question || 
            !updateFaqs.answer){
            alert('All fields are required');
            
        }
        else{
            try {
                const update = {
                    _id: updateFaqs._id,
                    question: updateFaqs.question,
                    answer: updateFaqs.answer
                };

                const response = await fetch('http://localhost:8000/api/faqs/update', { update });

                if (response.status === 200) {
                    alert('FAQ updated ');
                    getAllFaqs();
                    getshow(false);
                }
            } catch (error) {
                console.log(error);
            }
     

        


    
        };
exports.default FAQlist;