import { Button as AntdButton } from 'antd';

function Button(props : any) {
  return (
    <AntdButton type="primary" {...props}/>
  );
}

export default Button;
