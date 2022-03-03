class ProductController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
      @products = Product.all
    end

    def add_to_cart
      @product = Product.find(params[:id]).as_json
      @product[:quantity] = 1;      
      render json: { 
        'data': @product
      }
    end
end
