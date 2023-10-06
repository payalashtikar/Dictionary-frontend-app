import axios from 'axios';
import { useState } from 'react';
import './style.css'
export const Dictionary = () => {
    const [searchWord, setSearchWord] = useState('');
    const [definition, setDefinition] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);

            // Checking, if the response data is not empty
            if (response.data.length > 0) {

                // Assuming the response data is an array with definitions
                const firstDefinition = response.data[0].meanings[0].definitions[0].definition;

                // console.log(response.data[0].meanings[0].definitions)
                setDefinition(firstDefinition);
            } else {
                setDefinition('Definition not found');
            }
        } catch (error) {
            console.error('Error fetching definition:', error);
            setDefinition('Definition not found');
        }
    };

    return (
        <>
            <div className='container'>
                <h1>Dictionary App</h1>
                <input
                    type="text"
                    placeholder="Enter a word"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                />
                <button type="submit" onClick={handleSearch}>
                    Search
                </button>

                {definition && <p>Definition :-  {definition}</p>}

            </div>
        </>
    );
};
