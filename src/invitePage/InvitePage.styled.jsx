import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// 배경 스타일
export const PageBackground = styled.div`
    background: linear-gradient(135deg, #6f86d6, #48c6ef);
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

// 컨테이너
export const Container = styled.div`
    max-width: 500px;
    width: 100%;
    padding-bottom: 10px;

    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
`;

// 이미지 영역
export const HeaderImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

export const Title = styled.h2`
    font-size: 1.8em;
    color: #333;
    margin: 16px 0;
`;

export const Subtitle = styled.p`
    font-size: 1em;
    color: #777;
    margin-bottom: 20px;
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
    padding: 0 20px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
`;

export const Input = styled.input`
    width: 100%;
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1em;
    margin-bottom: 12px;
    box-sizing: border-box;

    &:focus {
        border-color: #007bff;
        outline: none;
    }

    &:disabled {
        background-color: #f9f9f9;
    }
`;

export const Button = styled.button`
    width: calc(100% - 40px);
    padding: 14px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    cursor: pointer;
    margin-top: ${(props) => (props.marginTop ? props.marginTop : '0')};

    &:hover {
        background-color: #333;
    }

    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 0.9em;
    margin-bottom: 20px;
`;

export const LoadingSpinner = styled(AiOutlineLoading3Quarters)`
    animation: spin 1s linear infinite;
    font-size: 2em;
    color: #007bff;
    display: block;
    margin: 0 auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;