@Get('descargar_autorizacion/:id')
  servePdf(@Param('id') id: string, @Res() response: Response) {
    const filePath = join(__dirname, 'temp/pdfs');  

  
    if (existsSync(filePath)) {
    
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader('Content-Disposition', `attachment; filename=${id}.pdf`);

    
      response.sendFile(filePath);
    } else {
    
      throw new NotFoundException('PDF not found');
    }
  }



  @Get('descargar_autorizacion/:id')
  downloadPdf(@Param('id') id: string, @Res() response: Response) {
    const pattern = { cmd: 'descargar_autorizacion' };
    const pdfDirectory = join(__dirname, 'pdfs/', `${id}.pdf`); 
    if (existsSync(pdfDirectory)) {
    
      this.client.send<string>(pattern, id).subscribe(filePath => {
        const stream = createReadStream(filePath);
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', `attachment; filename=${id}.pdf`);
        stream.pipe(response)
    
      response.sendFile(filePath)})
    }else {
    
      throw new NotFoundException('PDF not found');
    }
  }