import { APIResponse } from '../../common/interfaces/ApiResponse';
import { CustomerDto } from './customer.dto';

export interface customerResponse extends APIResponse {
  data?: CustomerDto | CustomerDto[];
}
