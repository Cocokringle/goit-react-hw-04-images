import { useState } from 'react';
import s from './Searchbar.module.css'

export default function Searchbar({onSubmit}){
    const [imageName,setImageName] = useState('')

    const handleNameChange = event => {
        setImageName(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (imageName.trim() === '') {
            alert('Введите название изображения.');
            return;
        }
        onSubmit(imageName);
        setImageName('');
    };

    return(
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={s.SearchForm_button}>
                </button>
        
                <input
                className={s.SearchForm_input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={imageName}
                onChange={handleNameChange}
                />
            </form>
        </header>
)
}

//         imageName: '',
//     }

//     handleNameChange = event => {
//         this.setState({ imageName: event.currentTarget.value.toLowerCase() });
//     };

//     handleSubmit = event => {
//         event.preventDefault();
//         if (this.state.imageName.trim() === '') {
//             alert('Введите название изображения.');
//             return;
//         }
//         this.props.onSubmit(this.state.imageName);
//         this.setState({ imageName: '' });
//     };

//     render (){
//         return(
//             <header className={s.Searchbar}>
//                 <form className={s.SearchForm} onSubmit={this.handleSubmit}>
//                     <button type="submit" className={s.SearchForm_button}>
//                     </button>

//                     <input
//                     className={s.SearchForm_input}
//                     type="text"
//                     autoComplete="off"
//                     autoFocus
//                     placeholder="Search images and photos"
//                     value={this.state.imageName}
//                     onChange={this.handleNameChange}
//                     />
//                 </form>
//             </header>
//         )
//     }

// }