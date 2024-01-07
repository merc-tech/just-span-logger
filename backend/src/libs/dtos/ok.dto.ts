import { Expose } from 'class-transformer';

export class OkResult {
  @Expose()
  ok: boolean;

  constructor(ok?: boolean) {
    if (ok) this.ok = ok;
    else this.ok = true;
  }
}
