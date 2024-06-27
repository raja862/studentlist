import React from "react";
import "./Student.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Table from 'react-bootstrap/Table';
import "bootstrap-icons/font/bootstrap-icons.css";



const Student = () => {


// const [filter, setFilter]=useState()


    const [setData, updateData] = useState([]) 
    
    const [filterpage,setFilterPage]= useState([])


    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 5;
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const records =filterpage .slice(firstIndex, lastIndex); //////setData
    const npage = Math.ceil(filterpage.length / perPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
    
    const prePages = () => {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }


    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }


    // const changePage = (id) => {
    //     setCurrentPage(id)
    // }
    useEffect(() => {
        Getfun()

    }, [])

//     const Getfun = async () => {
// try{
// const res=  await axios.get("https://happytestings.com/SRM/php/student_list.php")
//  updateData(res)
// console.log(res)
// }catch(error){
// console.log("Error:",error)


// }
//     }

     const Getfun = async () => {
    const result=await axios.get("https://happytestings.com/SRM/php/student_list.php").then(res =>{ 
        updateData(res.data)
        setFilterPage(res.data);

    })
    .catch(error => { console.log(error) })
    // console.log(records)
    return result
   
    }


    const handleDelete = async (id) => {
        try{
            const response = await axios.delete(`https://happytestings.com/SRM/php/delete_student.php?id=${id}`);
            if(response){
                Getfun();
            }
        }catch(error){
            console.log(error);
        }

    }

const filterPages=(event)=>{
setFilterPage(setData.filter(e=>e.student_name.toLowerCase().includes(event.target.value)))
}


   

    return (

        <div className="Container">
            <div className="header">
                <img className="greatimg" src="https://heycampus.io/School/asset/new-Logo.svg" alt="" />
                <h3 className="h1head"> Exam X Platform</h3></div>
            <div className="mainContainer">

                <div className="leftside">
                    <div className="lefth5">
                        <div className="icons" style={{padding:"10px"}}>
                            <i style={{ color: "red" }} class="bi bi-mortarboard"></i>
                            <h5>Degree</h5>
                        </div>
                        <div style={{padding:"10px"}}>
                            <i style={{ color: "yellow" }} class="bi bi-calendar-fill"></i>
                            <h5>Semester</h5>
                        </div>
                        <div style={{padding:"10px"}}>
                            <i style={{ color: "rgb(0,220,70)" }} class="bi bi-person-fill"></i>
                            <h5> Staffs</h5>
                        </div>
                        <div style={{padding:"10px"}}>
                            <i style={{ color: "orange" }} class="bi bi-journals"></i>
                            <h5> Subject</h5>
                        </div>
                        <div style={{padding:"10px"}}>
                            <i style={{ color: "blue" }} class="bi bi-book-fill"></i>
                            <h5>Exam</h5>
                        </div>
                        <div style={{padding:"10px"}}>
                            <i style={{ color: "red" }} class="bi bi-people-fill"></i>
                            <h5 >Student List</h5>
                        </div>
                        <div style={{padding:"10px"}}>
                            <i style={{ color: "orange" }} class="bi bi-journals"></i>
                            <h5> Exam Report </h5>
                        </div>
                        {/* <img className="greatimge" src="https://heycampus.io/School/asset/new-Logo.svg" alt="" /> */}

                    </div>
                </div>
                <div className="rightside">
                <input onChange={filterPages} className="inputs" type="search" placeholder="Search..."/>
                 <h3 className="h1student">Student List</h3>
    {/* <div className="p-8"> */}
        <table id="tableright" class="table table-striped">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Registration No</th>
                    <th>DOB</th>
                    <th>Profile Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

           
                {
                  
                  records.map((item, index) => {
                        return (<>
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.student_name}</td>
                                <td>{item.class_naming}</td>
                                <td>{item.registration}</td>
                                <td>{item.password}</td>
                                <td><img src={item.profile_img} alt="" className="imgt" /></td>
                                <td><button type="button" id="buttondelete" class="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button></td>
                                {/* <td><img>{item.profile_img}</img></td>  */}
            
                            </tr>
                        </>)
                    })
                }


            </tbody>
        </table>
    {/* </div> */}
                    

            <nav id="nave" aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#" onClick={prePages}> Prev</a></li>
{/* <button class="page-item"  onClick={prePages}>Previous</button> */}
                            {/* <li class="page-item"><a class="page-link" href="#" onClick={changePage}>1</a></li>
    <li class="page-item"><a class="page-link" href="#" onClick={changePage}>2</a></li>
    <li class="page-item"><a class="page-link" href="#" onClick={changePage}>3</a></li> */}
                            <li class="page-item"><a class="page-link" href="#" onClick={nextPage}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Student




