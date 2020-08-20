import Api from '@lib/Api/Api';

class Budget extends Api {
  path = 'http://localhost:3000/api/budget';
  constructor() {
    super(this.path);
  }
}

export default Budget;
