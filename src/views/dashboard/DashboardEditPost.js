import React, {useEffect,useContext} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'


import RichText from '../../editor/RichText'
import ImageUpload from '../../Uploaders/image-uploader'
import ArticleProvider from "../../context/ArticleContext"
import TitleInput from "../../inputs/title-input"
import ArticleStatus from "../../inputs/article-status"
import ArticleCategory from "../../inputs/article-category"
import ToastMe from "../../alerts/toaster"
import ModalMe from "../../modals/image-upload-modal"
import {useParams,useLocation} from 'react-router-dom'
import LoginModal from '../../modals/login-modal'


// const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


const Styles={
  link:{
    textDecoration:"underline",
    fontSize:"11px",
    color:"green"
  },
  Titles:{
    color:"black"
  },
  Theme:{
    background:"rgb(250, 252, 255)"
  },
  cardStyle:{
    boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    border:"none"
}
}
  


const DashboardUpdatePost = props=> {

  const {id} =useParams()
  const location =useLocation()
  const {fetchArticleByIdApi,resetEditArticle,resetArticle,setEditMode,setArticle,setCurrentArticle,editMode,selectedImageEn,selectedImageFr,validateArticle,toast,modal,article,apiAction}=useContext(ArticleProvider.Context)
 
 useEffect(()=>{

  if(id){
    resetArticle()
    resetEditArticle()
    setCurrentArticle(id)
    setEditMode("update")
    if(location.state!==undefined){
        setArticle(prevArticle=>{
            console.log("prev article",prevArticle)
            console.log("route state data",location.state.data)
            return {...prevArticle,...location.state.data}
          })
    }else{
        fetchArticleByIdApi(id)
    }
      //console.log("location state data",location.state.data)
    }else{
      setEditMode("new")
    }
    
     //console.log("article after redirect",article)
  console.log("featured img",article)
 },[])


 let editorInstance;

     return (
    <>
      <CRow>
        <CCol md="9">
          <CCard style={Styles.cardStyle}>
            <CCardHeader>
              English Version <a href="" style={Styles.link} id="acpb_upload_button_fr">All posts</a>
            </CCardHeader>
            <CCardBody>
             <h5>Title </h5>
             {article.type=="code" ?<h3>{article.title_en}</h3>:""}
             {article.type!=="code" ?<TitleInput  actionType="en" /> :""}        
             {article.type!=="code" ?<h5>Body </h5>: <><br/></> }
            {article.type!=="code" ? <RichText actionType="en" />: <h3 style={{color:"red"}}>This is a code generated page, content editing is disabled. You can however set featured images for French and English. </h3>}
            </CCardBody>
          </CCard>

        
        </CCol>
        <CCol md="3">
        <CCard style={Styles.cardStyle}>
        <CCardBody>

        <CCard>
        <CCardBody>
        <p><a href="" style={Styles.link} id="acpb_en_ft" className="acpb_upload_button_featured">Set featured image (EN) </a></p>
        <ImageUpload postType="en" target="acpb_upload_button_featured" />
        {selectedImageEn!=="" && <p align="center"><a href="" style={Styles.link} id="acpb_en_ft" className="acpb_featured_en_remove" id="acpb_ft_rm_en">remove</a></p>} 
                 
        </CCardBody>
          </CCard>

          <CCard>
        <CCardBody>
        <p><a href="" style={Styles.link} id="acpb_fr_ft" className="acpb_upload_button_featured">Set featured image (FR) </a></p>
        <ImageUpload postType="fr" target="acpb_upload_button_featured" />
        {selectedImageFr!=="" && <p align="center" id="acpb_ft_rm_fr"><a href="" style={Styles.link} id="acpb_fr_ft" className="acpb_featured_fr_remove">remove</a></p>} 
        
        {/* <hr /> */}
                 
        </CCardBody>
          </CCard>


          
          <CCard>
        <CCardBody>
        
        <ArticleCategory />
                 
        </CCardBody>
          </CCard>
         
          
           <ArticleStatus />
          

          
          {apiAction ? 
                    <button className="btn btn-primary px-4 w-100"   disabled={apiAction}>
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      &nbsp;Loading...
                    </button> : 
                    <CButton onClick={()=>{validateArticle()}} color="primary" size="md" block md="12">{editMode==="new" ?"Publish":"Update"}</CButton>}

          <ToastMe showToast={toast}  context={ArticleProvider.Context} />
          <ModalMe showToast={modal} />
          
          {/* <a href="" style={Styles.link} id="acpb_upload_button_fr">Set featured image (FR) </a> */}
          </CCardBody>
          </CCard>

         
         


        </CCol>
      </CRow>



      <CRow>
      {article.type!=="code" ?
        <CCol md="9">
          <CCard style={Styles.cardStyle}>
            <CCardHeader>
              French
            </CCardHeader>
            <CCardBody>
             <h5>Title (French)</h5>
            < TitleInput actionType="fr" />
            
            <h5>Body (French)</h5>
             <RichText actionType="fr"/>
            
            </CCardBody>
          </CCard>
        </CCol>
        :""}
      
        <LoginModal context={ArticleProvider.Context}/>
      </CRow>



    </>
  )
}

export default DashboardUpdatePost
