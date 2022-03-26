import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import LoadMoreButton from './Button/Button'
import api from '../services/image-api'
import ImageGallery from './ImageGallery/ImageGallery';
import s from './App.module.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from './Modal/Modal';
import usePrevious from 'hooks/usePrevious';


export default function App(){
  const [images, setImages] = useState([]);
  const [imageName, setImagesName] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const prevSearchQuery = usePrevious(imageName);

  useEffect(()=> {
  if(!imageName){
    return;
  }
  setIsLoading(true)
  setIsVisible(true)

      api.fetchImages(imageName,page).then(({hits,totalHits }) => {

              if (totalHits - page * 12 < 12) {
                setIsVisible(false);
              }
              if (totalHits === 0) {
                alert('There are no photos');
              } 
              setImages(prevImagesSet => [...prevImagesSet, ...hits]
              );
      }).finally(() => {
        setIsLoading(false);

      }).catch(error => console.log(error));

}, [imageName, page])

  const galleryReset = () => {
    setImages([]);
    setPage(1);
  };
  const onFormSubmit = searchQuery => {
    if (prevSearchQuery === searchQuery) {
      return;
  }

    setImagesName(searchQuery);
    galleryReset();
  };

  const onClickMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  }

  const toggleModal = largeImageURL => {
    setShowModal(showModal => !showModal);
    setLargeImage(largeImageURL);
  };

  return (
  <div className={s.App}>
    <Searchbar onSubmit={onFormSubmit}/>
    <ImageGallery  toggleModal={toggleModal} images={images} onClickMoreBtn={onClickMoreBtn} isLoading={isLoading}></ImageGallery>
    {isVisible && <LoadMoreButton onClickMoreBtn={onClickMoreBtn}/>}
    {showModal && (
      <Modal image={largeImage} onClose={toggleModal} alt={imageName}/>
    )}
  </div>
  );
}

// export default class App extends Component {
//   state = {
//     images: [],
//     imageName: '',
//     page: 1,
//     isLoading: false,
//     showModal: false,
//     largeImage: '',
//     isVisible: false,
//   };

//   getImageName = imageName => {
//     this.setState({ imageName });
//   };

//   onClickMoreBtn = () => {
//     this.setState({
// 			page: this.state.page + 1,
// 		});

//   }

//   toggleModal = (image) => {
    
//     this.setState(({ showModal }) => ({
//       largeImage: image,
//       showModal: !showModal,
//     }));
 
//   };

//   componentDidUpdate(prevProps, prevState){
//     const prevImage = prevState.imageName;
// 		const currentImage = this.state.imageName;

//     if(prevImage !== currentImage){
//       this.setState({
//           images: [],
//           page: 1,
//       })
//     }
//     if (prevImage !== currentImage || prevState.page!== this.state.page) {
// 			this.setState({
				// isLoading: true,
//         isVisible: true,
// 			});

//       api.fetchImages(currentImage, this.state.page).then((images) => {
//         if (images.totalHits - this.state.page * 12 < 12) {
//           this.setState({ isVisible: false });
//         }
//         if (images.totalHits.length === 0) {
//           alert('There are no photos');
//         }
//         this.setState({
//           images: [...this.state.images, ...images.hits],
//         });
//       })
//       .finally(() => {
//         this.setState({
//           isLoading: false,
//         });
//       });
//     }
    
//   }
//   render() {
//     const {images, isLoading, showModal, largeImage, imageName, isVisible} = this.state
//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.getImageName}/>
//         <ImageGallery  toggleModal={this.toggleModal} images={images} onClickMoreBtn={this.onClickMoreBtn} isLoading={isLoading}></ImageGallery>
//         {isVisible && <LoadMoreButton onClickMoreBtn={this.onClickMoreBtn}/>}
//         {showModal && (
//           <Modal image={largeImage} onClose={this.toggleModal} alt={imageName}/>
//         )}
//       </div>
//     );
//   }
// }