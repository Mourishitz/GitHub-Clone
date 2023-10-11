export interface IHttpClient {
    /**
     * Makes a get method call to an endpoint.
     * 
     * @throws HttpServiceException
     * @param endpoint 
     */
   get(endpoint: string): Promise<any>

   /**
    * Makes a post method call to an endpoint.
    * 
    * @throws HttpServiceException
    * @param endpoint 
    * @param data 
    */
   post(endpoint: string, data: any): Promise<any>

   /**
    * Makes a put method call to an endpoint.
    * 
    * @throws HttpServiceException
    * @param endpoint 
    * @param data 
    */
   put(endpoint: string, data: any): Promise<any>

   /**
    * Makes a delete method call to an endpoint.
    * 
    * @throws HttpServiceException
    * @param endpoint 
    */
   delete(endpoint: string): Promise<any>
}