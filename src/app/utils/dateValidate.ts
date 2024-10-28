import { IValidateProps } from '../types/props';

const dateValidate = (expirationDate: string, dateManufacture: string): IValidateProps => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const today = date.getDate();
  const currentMonth = date.getMonth() + 1;

  const expiration = expirationDate.split('-').map(Number);
  const manufacture = dateManufacture.split('-').map(Number);

  const returnSituation = ({
    message,
    isContinue,
  }: IValidateProps): IValidateProps => {
    return { message, isContinue };
  };

  // Função para validar a data de fabricação
  const manufactureValidate = (message?: string | undefined): IValidateProps => {
    if (expiration[0] >= manufacture[0]) {
      if (expiration[0] === manufacture[0] && expiration[1] >= manufacture[1]) {
        if (expiration[1] === manufacture[1] && expiration[2] < manufacture[2]) {
          return returnSituation({
            message: [
              message,
              'A data de fabricação do produto é maior que a de validade',
            ],
            isContinue: false,
          });
        } else {
          return returnSituation({ message: [message], isContinue: true });
        }
      } else {
        return returnSituation({
          message: [
            message,
            'A data de fabricação do produto é maior que a de validade',
          ],
          isContinue: false,
        });
      }
    } else {
      return returnSituation({
        message: [
          message,
          'A data de fabricação do produto é maior que a de validade',
        ],
        isContinue: false,
      });
    }
  };

  // Validação para verificar se a data de validade é maior que a data atual
  if (expiration[0] >= currentYear) {
    if (expiration[0] === currentYear && expiration[1] >= currentMonth) {
      if (expiration[1] === currentMonth && expiration[2] <= today) {
        return manufactureValidate('Produto se encontra vencido');
      } else {
        return manufactureValidate();
      }
    } else {
      return manufactureValidate('Produto se encontra vencido');
    }
  } else {
    return manufactureValidate('Produto se encontra vencido');
  }
};

export default dateValidate;
