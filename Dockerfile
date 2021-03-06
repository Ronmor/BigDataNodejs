FROM node
#RUN apk add g++ make python

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
ARG DEBIAN_FRONTEND=noninteractive


#RUN apt-get update
#RUN apt-get install -y build-essential
#RUN CFLAGS=-I/usr/local/opt/openssl/include LDFLAGS=-L/usr/local/opt/openssl/lib npm install --save node-rdkafka

#RUN npm install openssl
#RUN apt-get install -y librdkafka-dev
#RUN npm install node-rdkafka

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


# Bundle app source
COPY . .

EXPOSE 3000
# CMD ["ls", "Views"]
# CMD ["pwd"]
CMD [ "node", "app.js" ]