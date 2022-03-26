import s from './Modal.module.css'
import React, { useEffect } from 'react';

export default function Modal({onClose, image,imageName}){
  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  })

    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    const handleBackdropClick = event => {
  
      if (event.currentTarget === event.target) {
        onClose();
      }
    };

    return (
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>
        <img className={s.Modal_image} src={image} alt={imageName}/>
        </div>
      </div>
    );
}
// export default class Modal extends Component {
//     componentDidMount() {
    
//       window.addEventListener('keydown', this.handleKeyDown);
//     }
  
//     componentWillUnmount() {
     
//       window.removeEventListener('keydown', this.handleKeyDown);
//     }
  
//     handleKeyDown = e => {
//       if (e.code === 'Escape') {
//         this.props.onClose();
//       }
//     };
  
//     handleBackdropClick = event => {
  
//       if (event.currentTarget === event.target) {
//         this.props.onClose();
//       }
//     };
  
//     render() {
//       return (
//         <div className={s.Overlay} onClick={this.handleBackdropClick}>
//           <div className={s.Modal}>
//           <img className={s.Modal_image} src={this.props.image} alt={this.props.imageName}/>
//           </div>
//         </div>
//       );
//     }
//   }